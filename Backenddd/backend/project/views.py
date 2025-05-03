from rest_framework import viewsets
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, permissions,generics
from django.core.mail import send_mail
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import jwt
from datetime import datetime, timedelta
from django.middleware.csrf import get_token
from django.http import JsonResponse
from datetime import datetime
from django.contrib.auth.models import update_last_login
from .serializers import ChangePasswordSerializer
from django.shortcuts import get_object_or_404
from .models import Caretaker,Booking,CustomUser,Notification
from django.contrib.auth import get_user_model
from .serializers import UserRegistrationSerializer,LoginSerializer,CaretakerSerializer,BookingSerializer,CustomUserSerializer,NotificationSerializer,ReviewSerializer,UserProfileSerializer
import ipdb
from rest_framework.parsers import MultiPartParser, FormParser



# User ViewSet for CRUD operations
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserRegistrationSerializer
    queryset = get_user_model().objects.all()
    # permission_classes = [IsAuthenticated]  # Restrict actions to authenticated users, or any custom permission.


class UserRegistrationView(APIView):
   
    permission_classes = [AllowAny]  # To allow anyone to log in

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save() 
            user.role = 'user'
            user.save()
            return Response({
                "message": "User registered successfully!",
                "user": {
                    "username": user.username,   
                    "name":user.name,
                      "gender" :user.gender,
                      "address"  :user.address,     
                      "phone"  :user.phone,    
                      "email": user.email,
                    "role": user.role  # Send role in response to navigate to roles based home
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_caretaker(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            'caretaker_id': user.id,
            'refresh': str(refresh),
            'access_token': str(refresh.access_token),
            'csrf_token': get_token(request), 

            'username': user.username,
            'email': user.email,
            'role': user.role
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Api creation for login
User = get_user_model()

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data.get('user')  

            refresh = RefreshToken.for_user(user)  # Generate JWT tokens
            return Response({
                'user_id': user.id,
                'refresh': str(refresh),
                'access_token': str(refresh.access_token),
                'username': user.username,
                'email': user.email,
                'role': user.role  # Include role in response
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# API of caretaker list
@api_view(['GET'])
@permission_classes([AllowAny])  # Allows anyone to access this view // to test the fetch data
def get_caretakers(request,caretaker_id=None):
    if caretaker_id:
        caretakers = get_object_or_404(Caretaker,id=caretaker_id)
        serializer = CaretakerSerializer(caretakers)
        return Response(serializer.data)  # Return serialized data as response

    else:
        caretakers = Caretaker.objects.all()  # Fetch all caretakers
        serializer = CaretakerSerializer(caretakers, many=True)  # Serialize data
        return Response(serializer.data)  # Return serialized data as response



# API of User list
@api_view(['GET'])
@permission_classes([AllowAny])# admin can only  see the list of user
def get_user(request,user_id=None):
    if user_id:
        users = get_object_or_404(CustomUser,id=user_id)
        serializer = CustomUserSerializer(users)
        return Response(serializer.data)  # Return serialized data as response

    else:
        users = CustomUser.objects.all() #to fetch all user
        serializer = CustomUserSerializer(users,many=True)
        return Response(serializer.data)



# Booking the caretakerfrom datetime import datetime, timedelta
from django.core.mail import send_mail

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def book_caretaker(request):
    caretaker_id = request.data.get('caretaker_id')
    booking_date = request.data.get('booking_date') 
    location = request.data.get('location')  
    number = request.data.get('number')
    note = request.data.get('note')
    price = request.data.get('price')

    # Validate caretaker exists       
    try:
        caretaker = Caretaker.objects.get(id=caretaker_id)
    except Caretaker.DoesNotExist:
        return Response({"detail": "Caretaker does not exist"}, status=status.HTTP_404_NOT_FOUND)

    # Parse full datetime 
    try:
        booking_date = datetime.strptime(booking_date, "%Y-%m-%dT%H:%M:%S")
    except ValueError:
        return Response({"detail": "Invalid datetime format. Use YYYY-MM-DDTHH:MM:SS"}, status=status.HTTP_400_BAD_REQUEST)

    # Check for existing booking at the same time for same caretaker
    existing_booking = Booking.objects.filter(
        caretaker=caretaker,
        booking_date=booking_date
    ).exclude(status='rejected')

    if existing_booking.exists():
        return Response({"detail": "Caretaker is already booked at this time."}, status=status.HTTP_400_BAD_REQUEST)

    # Save booking
    booking = Booking(
        user=request.user,
        caretaker=caretaker,
        booking_date=booking_date,
        status="pending",
        location=location,
        number=number,
        note=note,
        price=price
    )
    booking.save()

    send_mail(
        subject="New Booking Request",
        message=f"Hello {caretaker.name},\n\nYou have received a new booking request from {request.user.name}.\n\n"
                f"Date & Time: {booking_date.strftime('%Y-%m-%d %H:%M')}\n"
                f"Location: {location}\n"
                f"Phone: {number}\n"
                f"Note: {note or 'N/A'}\n\n"
                f"Please check your dashboard to accept or reject the booking.",
        from_email=None,  
        recipient_list=[caretaker.email],
        fail_silently=False
    )

    return Response({"booking_id": booking.id, **BookingSerializer(booking).data}, status=status.HTTP_201_CREATED)


# Booking details
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensure only authenticated users can access
def get_Booking(request, booking_id=None):
    user = request.user  # Get the logged-in user

    if booking_id:
        try:
            booking = Booking.objects.get(id=booking_id, user=user)  # Filter by user
            serializer = BookingSerializer(booking)  
            return Response(serializer.data, status=200)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found or unauthorized"}, status=404)

    else:
        bookings = Booking.objects.filter(user=user)  # Fetch all bookings for the logged-in user
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data, status=200)





# chnage password for user
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            old_password = serializer.validated_data['old_password']
            new_password = serializer.validated_data['new_password']
            confirm_password = serializer.validated_data['confirm_password']

            # Check if new passwords match
            if new_password != confirm_password:
                return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

            # Check if old password is correct
            if not user.check_password(old_password):
                return Response({"error": "Old password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

            # Set the new password
            user.set_password(new_password)
            user.save()
            update_last_login(None, user)  

            return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# notification
class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        # Automatically assign the logged-in user to the notification
        serializer.save(user=self.request.user)


# to add reivew to caretaker
class ReviewView(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        caretaker_id = self.kwargs['caretaker_id']
        serializer.save(user=self.request.user,caretaker_id=caretaker_id)



# reset password

User = get_user_model()
@method_decorator(csrf_exempt, name='dispatch')
class RequestPasswordResetView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
     
        email = request.data.get('email')

       
        try:
            user = User.objects.get(email=email)
            
            # Generate JWT token with 24-hour expiration
            payload = {
                'user_id': user.id,
                'email': user.email,
                'exp': datetime.utcnow() + timedelta(minutes=5),
                'iat': datetime.utcnow()
            }
            
            token = jwt.encode(
                payload,
                settings.SECRET_KEY,
                algorithm='HS256'
            )

            
            # Create reset URL to be included in email
            reset_url = f"http://localhost:5173/reset-password?t={token}"
            
            html_message = f"""
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Reset Your Password</title>
                            <style>
                                body {{
                                    font-family: Arial, sans-serif;
                                    line-height: 1.6;
                                    color: #333333;
                                    max-width: 600px;
                                    margin: 0 auto;
                                    padding: 20px;
                                }}
                                .container {{
                                    background-color: #f9f9f9;
                                    border-radius: 5px;
                                    padding: 20px;
                                    border: 1px solid #dddddd;
                                }}
                                .header {{
                                    text-align: center;
                                    padding-bottom: 15px;
                                    border-bottom: 1px solid #eeeeee;
                                    margin-bottom: 20px;
                                }}
                                .btn {{
                                    display: inline-block;
                                    background-color: #4CAF50;
                                    color: white !important;
                                    text-decoration: none;
                                    padding: 12px 24px;
                                    border-radius: 4px;
                                    font-weight: bold;
                                    margin: 20px 0;
                                }}
                                .footer {{
                                    margin-top: 20px;
                                    font-size: 12px;
                                    text-align: center;
                                    color: #777777;
                                }}
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h2>Password Reset Request</h2>
                                </div>
                                
                                <p>Hello,</p>
                                <p>We received a request to reset your password. Click the button below to create a new password:</p>
                                
                                <div style="text-align: center;">
                                    <a href="{reset_url}" class="btn">Reset Password</a>
                                </div>
                                
                                <p>If you didn't request a password reset, you can safely ignore this email.</p>
                                
                                <p>The password reset link will expire in 24 hours.</p>
                                
                                <p>If the button doesn't work, copy and paste this link into your browser:</p>
                                <p style="word-break: break-all;"><a href="{reset_url}">Click Here</a></p>
                            </div>
                            
                            <div class="footer">
                                <p>This is an automated message, please do not reply to this email.</p>
                            </div>
                        </body>
                        </html>
            """
           
            # Send email with reset link
            send_mail(
                subject="Reset Your Password",
                message=f"Click the link to reset your password: {reset_url}",
                from_email=f'ConnectCare<{settings.DEFAULT_FROM_EMAIL}>',
                recipient_list=[user.email],
                html_message=html_message,
            )
        except User.DoesNotExist:
            # Don't reveal if the email exists in the system
            pass
            
        # Always return success regardless of whether email exists
        return Response(
            {'message': 'If an account with this email exists, a password reset link has been sent.',
             'success': True}, 
                        status=status.HTTP_200_OK,
            
                        )



@method_decorator(csrf_exempt, name='dispatch')
class ResetNewPassword(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        token = request.data.get('token')
        password = request.data.get("password")

        
        if not token or not password:
            return Response(
                {'error': 'Token and password are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Decode the JWT token
            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=['HS256']
            )

            
            # Extract user information from the payload
            user_id = payload.get('user_id')
            email = payload.get('email')
            
            # Find the user
            user = User.objects.get(id=user_id, email=email)
            
            # Set the new password
            user.set_password(password)
            user.save()

            message = "Your password has been successfully changed."

            html_message = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Password Changed</title>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        color: #333;
                        background-color: #f4f4f4;
                        padding: 20px;
                    }}
                    .container {{
                        max-width: 600px;
                        margin: auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        padding: 30px;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    }}
                    .header {{
                        text-align: center;
                        padding-bottom: 20px;
                    }}
                    .header h2 {{
                        color: #4CAF50;
                    }}
                    .content {{
                        font-size: 16px;
                        line-height: 1.6;
                    }}
                    .footer {{
                        margin-top: 30px;
                        text-align: center;
                        font-size: 12px;
                        color: #888;
                    }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>Password Successfully Changed</h2>
                    </div>
                    <div class="content">
                        <p>Hi {user.name},</p>
                        <p>This is a confirmation that your password was successfully changed. If this wasn’t you, please contact our support team immediately.</p>
                        <p>If you did change your password, no further action is needed.</p>
                    </div>
                    <div class="footer">
                        <p>This is an automated message — please do not reply.</p>
                    </div>
                </div>
            </body>
            </html>
            """

            send_mail(
                subject="Your Password Was Successfully Changed",
                message=message,
                from_email=f'ConnectCare<{settings.DEFAULT_FROM_EMAIL}>',
                recipient_list=[user.email],
                html_message=html_message,
                fail_silently=False

             )
            
            return Response(
                {'message': 'Password has been reset successfully',
                 'success': True
                 }, 
                status=status.HTTP_200_OK,
               
            )
            
        except jwt.ExpiredSignatureError:
            return Response(
                {'error': 'Password reset link has expired',
                 'success': False}, 
                status=status.HTTP_400_BAD_REQUEST,
                
            )
        except jwt.InvalidTokenError:
            return Response(
                {'error': 'Invalid token',
                 'success': False}, 
                status=status.HTTP_400_BAD_REQUEST,
               

            )
        except User.DoesNotExist:
            return Response(
                {'error': 'User not found',
                 'success': False}, 
                status=status.HTTP_404_NOT_FOUND,
               

            )
        except Exception as e:
            return Response(
                {'error': f'An error occurred: {str(e)}',
                 'success': True}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                

            )




class EditProfile(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser] 

    def patch(self,request,user_id):
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response ({'message': 'User not found try again',
                              'Success':False},
                              status=status.HTTP_400_BAD_REQUEST)
        
        if request.user != user:
            return  Response({'message':'Unauthorized'},
                             status=status.HTTP_401_UNAUTHORIZED)
        

        serializer = UserProfileSerializer(user,data=request.data,partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response ({'message':'Profile updated easily','Success':True},
                             status=status.HTTP_200_OK)
        
        return Response({'Message':'Error updating the details . Try again','success':False},status=status.HTTP_400_BAD_REQUEST)