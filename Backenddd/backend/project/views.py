from rest_framework import viewsets
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, permissions
# from .models import CaretakerBooking
from datetime import datetime
from django.contrib.auth.models import update_last_login
from .serializers import ChangePasswordSerializer
from django.shortcuts import get_object_or_404
from .models import Caretaker,Booking,CustomUser
from django.contrib.auth import get_user_model
from .serializers import UserRegistrationSerializer,LoginSerializer,CaretakerSerializer,BookingSerializer,CustomUserSerializer

# User ViewSet for CRUD operations
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserRegistrationSerializer
    queryset = get_user_model().objects.all()
    permission_classes = [IsAuthenticated]  # Restrict actions to authenticated users, or any custom permission.


# Registration API view for creating new users
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
                    "email": user.email,
                    "role": user.role  # Send role in response to navigate to roles based home
                }
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
                'first_name': user.first_name,
                'number': user.number,
                'address': user.address,
                # 'first_name':user.first_name,

                'email': user.email,
                'role': user.role  # Include role in response
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# api for caretakerlogin
class CaretakerLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data.get('caretaker')  # Use 'user' for both CustomUser and Caretaker

            if not user:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

            if isinstance(user, Caretaker):  # Ensure it's a Caretaker
                refresh = RefreshToken.for_user(user)  # Generate JWT tokens
                return Response({
                    'caretaker_id': user.id,
                    'refresh': str(refresh),
                    'access_token': str(refresh.access_token),
                    'username': user.username,
                    'email': user.email,
                    'role': "caretaker"  # Explicitly return role
                }, status=status.HTTP_200_OK)

            return Response({"error": "Unauthorized role"}, status=status.HTTP_403_FORBIDDEN)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminLoginView(APIView):
    permission_classes = [AllowAny]  # Corrected

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data.get('user')  # Get user object

            if not user.is_staff:  # Ensure only admin users can log in
                return Response({"error": "You are not authorized as an admin"}, status=status.HTTP_403_FORBIDDEN)

            refresh = RefreshToken.for_user(user)  # Generate JWT tokens
            return Response({
                'refresh': str(refresh),
                'access_token': str(refresh.access_token),
                'username': user.username,
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




@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensure user is logged in
def book_caretaker(request):
    caretaker_id = request.data.get('caretaker_id')
    booking_date = request.data.get('booking_date') 
    location = request.data.get('location')  
    number = request.data.get('number')
    
    # Validate caretaker exists
    try:
        caretaker = Caretaker.objects.get(id=caretaker_id)
    except Caretaker.DoesNotExist:
        return Response({"detail": "Caretaker does not exist"}, status=status.HTTP_404_NOT_FOUND)

    # Validate and convert booking date (only date part)
    try:
        booking_date = datetime.strptime(booking_date, "%Y-%m-%d")  # Parse date
        booking_date = booking_date.replace(hour=0, minute=0, second=0, microsecond=0)  # Set time to midnight
    except ValueError:
        return Response({"detail": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

    # Create and save booking
    booking = Booking(user=request.user, caretaker=caretaker, booking_date=booking_date, status="Pending",location=location,  # Save location
        number=number )
    booking.save()

    # Check if saved
    if not Booking.objects.filter(id=booking.id).exists():
        return Response({"detail": "Booking not saved due to unknown error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"booking_id": booking.id, **BookingSerializer(booking).data}, status=status.HTTP_201_CREATED)



# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get_Booking(request, booking_id=None):
#     if booking_id:
#         try:
#             booking = Booking.objects.get(id=booking_id)
#             serializer = BookingSerializer(booking)  
#             return Response(serializer.data, status=200)
#         except Booking.DoesNotExist:
#             return Response({"error": "Booking not found"}, status=404) 

#     else:
#         bookings = Booking.objects.all()
#         serializer = BookingSerializer(bookings, many=True)
#         return Response(serializer.data)

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



@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def booking_action(request, booking_id):
    try:

        booking = Booking.objects.get(id=booking_id, caretaker_id=request.user.id)
    except Booking.DoesNotExist:
        return Response({"error": "Booking not found or unauthorized"}, status=status.HTTP_404_NOT_FOUND)

    action = request.data.get("action") 

    if action == "accept":
        booking.status = "accepted"
    elif action == "reject":
        booking.status = "rejected"
    else:
        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

    booking.save()

    return Response({"message": f"Booking {booking.status} successfully"}, status=status.HTTP_200_OK)