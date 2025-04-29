from django.contrib.auth.hashers import check_password,make_password
from .serializers import CaretakerSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from .models import Booking
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import status,generics,permissions
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CaretakerSerializer,BookingSerializer,LoginSerializer,CaretakerChangePasswordSerializer
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .models import Caretaker,CustomUser
from django.contrib.auth.models import update_last_login
from django.contrib.auth.hashers import check_password, make_password




class CareRegistrationView(APIView):
   
    permission_classes = [AllowAny]  # To allow anyone to log in

    def post(self, request):
        serializer = CaretakerSerializer(data=request.data)
        if serializer.is_valid():
            caretaker = serializer.save() 
            caretaker.role = 'caretaker'
            caretaker.save()
            return Response({
                "message": "User registered successfully!",
                "user": {
                    "username": caretaker.username,   
                    "caretaker_id":caretaker.id,
                    "name":caretaker.name,
                      "gender" :caretaker.gender,
                      "address"  :caretaker.address,     
                      "phone"  :caretaker.phone,    
                      "email": caretaker.email,
                    "role": caretaker.role  # Send role in response to navigate to roles based home
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Api creation for login
User = get_user_model()
class CareLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            caretaker = serializer.validated_data.get('caretaker')
            
            # Add this check to prevent the error
            if caretaker is None:
                return Response({
                    'error': 'Invalid credentials or user not found'
                }, status=status.HTTP_401_UNAUTHORIZED)
                
            refresh = RefreshToken.for_user(caretaker)  # Generate JWT tokens
            return Response({       
                "caretaker_id":caretaker.id,
                'refresh': str(refresh),
                'access_token': str(refresh.access_token),
                'role': caretaker.role  # Include role in response
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Caretaker list side
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensure only authenticated users can access
def get_CaretakerBooking(request, caretaker_id=None, booking_id=None):
    caretaker = request.user  # Get the logged-in user

    # Check if the provided caretaker_id matches the logged-in caretaker's ID
    if caretaker_id and caretaker.id != int(caretaker_id):
        return Response({"error": "Unauthorized access"}, status=403)

    if booking_id:
        try:
            booking = Booking.objects.get(id=booking_id, caretaker_id=caretaker.id)  # Filter by caretaker_id
            serializer = BookingSerializer(booking)
            return Response(serializer.data, status=200)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found or unauthorized"}, status=404)
    
    else:
        bookings = Booking.objects.filter(caretaker_id=caretaker.id)  # Filter bookings for the given caretaker
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data, status=200)




# Caretaker accepting portal
@api_view(['POST'])
@permission_classes([AllowAny])
def booking_action(request, booking_id):
    try:
        booking = Booking.objects.get(id=booking_id, caretaker_id=request.user.id)
        # ipdb.set_trace()
    except Booking.DoesNotExist:
        return Response({"error": "Booking not found or you don't have permission to access it."}, status=status.HTTP_404_NOT_FOUND)

    action = request.data.get("action")

    if action == "accept":
        booking.status = "accepted"
        message = f"Your booking with {booking.caretaker.name} has been accepted!"
    elif action == "reject":
        booking.status = "rejected"
        message = f"Your booking with {booking.caretaker.name} has been rejected."
    else:
        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

    booking.save()

    # Create email notification for the user who made the booking
    html_message = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Booking Update</title>
        <style>
            body {{
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f2f2f2;
                padding: 20px;
                color: #333;
            }}
            .container {{
                max-width: 600px;
                margin: auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }}
            .header {{
                text-align: center;
                border-bottom: 2px solid #4CAF50;
                padding-bottom: 15px;
                margin-bottom: 20px;
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
                font-size: 12px;
                text-align: center;
                color: #999;
            }}
            .highlight {{
                background-color: #e8f5e9;
                padding: 10px;
                border-left: 4px solid #4CAF50;
                margin: 15px 0;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>Booking Update</h2>
            </div>
            <div class="content">
                <p>Hi {booking.user.first_name},</p>
                <p>We wanted to let you know that your booking has been <strong>updated</strong>. Below is a summary of the update:</p>
                
                <div class="highlight">
                    <p>{message}</p>
                </div>

                <p>If you have any questions or concerns, feel free to reply or contact our support team.</p>

                <p>Thank you for choosing us!</p>
            </div>
            <div class="footer">
                <p>This is an automated message. Please do not reply directly to this email.</p>
            </div>
        </div>
    </body>
    </html>
"""

    send_mail(
    subject="Booking Update Notification",
    message=message,
    from_email=settings.DEFAULT_FROM_EMAIL,
    recipient_list=[booking.user.email],
    html_message=html_message,
    fail_silently=False
)
    

    return Response({"message": f"Booking {booking.status} successfully"}, status=status.HTTP_200_OK)



# count booking
@api_view(["GET"])
@permission_classes([AllowAny])
def booking_count_api(request, caretaker_id):
   
    if caretaker_id is None:
        return Response({"error": "Caretaker ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    total_bookings = Booking.objects.filter(caretaker_id=caretaker_id).count()
    total_pending = Booking.objects.filter(caretaker_id=caretaker_id, status='pending').count()
    completed_tasks = Booking.objects.filter(caretaker_id=caretaker_id, status='completed').count()

    return Response({"total_bookings": total_bookings,"total_pending": total_pending,"completed_task":completed_tasks}, status=status.HTTP_200_OK)




class CaretakerChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, caretaker_id):
        try:
            caretaker = Caretaker.objects.get(id=caretaker_id)
        except Caretaker.DoesNotExist:
            return Response({"error": "Caretaker not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = CaretakerChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            old_password = serializer.validated_data['old_password']
            new_password = serializer.validated_data['new_password']
            confirm_password = serializer.validated_data['confirm_password']

            if new_password != confirm_password:
                return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

            # Check old password
            if not check_password(old_password, caretaker.password):
                return Response({"error": "Old password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

            # Set new password
            caretaker.password = make_password(new_password)
            caretaker.save()

            return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# to edit the user details
class CaretakerProfileView(generics.RetrieveAPIView):
    serializer_class = Caretaker
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
    


from django.utils.decorators import  method_decorator
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime,timedelta
import jwt


# forgot password
# user = get_user_model()
@method_decorator(csrf_exempt,name='dispatch')
class RequestResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self,request):

        email = request.data.get('email')

        try:
            caretaker = Caretaker.objects.get(email=email)

            payload = {
                'caretaker_id' :caretaker.id,
                'email' :caretaker.email,
                'exp': datetime.utcnow() + timedelta(minutes=5),
                'iat': datetime.utcnow()
            }

            token = jwt.encode(
                payload,
                settings.SECRET_KEY,
                algorithm='HS256'
            )

            url=f"http://localhost:5173/reset-passwords?t={token}"
            html_msg = f"""
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
                                    <a href="{url}" class="btn">Reset Password</a>
                                </div>
                                
                                <p>If you didn't request a password reset, you can safely ignore this email.</p>
                                
                                <p>The password reset link will expire in 24 hours.</p>
                                
                                <p>If the button doesn't work, copy and paste this link into your browser:</p>
                                <p style="word-break: break-all;"><a href="{url}">Click Here</a></p>
                            </div>
                            
                            <div class="footer">
                                <p>This is an automated message, please do not reply to this email.</p>
                            </div>
                        </body>
                        </html>
                        """ 
            
            send_mail(
                        subject="Reset you password",
                        message=f"Click the link to reset you password:",
                        from_email=settings.DEFAULT_FROM_EMAIL,
                        recipient_list=[caretaker.email],
                        html_message=html_msg,
                )

        except Caretaker.DoesNotExist:
            return('Caretaker not found')


        return Response({"message" : 'Email send',
                         'success':True },status=status.HTTP_200_OK)
    


@method_decorator(csrf_exempt,name='dispatch')
class NewPasswordReset(APIView):
    permission_classes = [AllowAny]

    def post(self,request):
        token = request.data.get('token')
        password =  request.data.get('password')

        if not token or not password:
            return Response({"error":'Token and password not found'},status=status.HTTP_400_BAD_REQUEST)
        
        try:
            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=['HS256']
            )
            caretaker_id = payload.get('caretaker_id')
            email = payload.get('email')

            caretaker = Caretaker.objects.get(id=caretaker_id,email=email)
            caretaker.password = make_password(password)
            caretaker.save()

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
                        <p>Hi {caretaker.name},</p>
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
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[caretaker.email],
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
        except Caretaker.DoesNotExist:
            return Response(
                {'error': 'Caretaker not found',
                 'success': False}, 
                status=status.HTTP_404_NOT_FOUND,
               

            )
        except Exception as e:
            return Response(
                {'error': f'An error occurred: {str(e)}',
                 'success': True}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                

            )

