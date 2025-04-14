from rest_framework import viewsets
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, permissions,generics
from django.shortcuts import render
from django.middleware.csrf import get_token
from django.http import JsonResponse
from datetime import datetime
from django.contrib.auth.models import update_last_login
from .serializers import ChangePasswordSerializer
from django.shortcuts import get_object_or_404
from .models import Caretaker,Booking,CustomUser,Notification
from django.contrib.auth import get_user_model
from .serializers import UserRegistrationSerializer,LoginSerializer,CaretakerSerializer,BookingSerializer,CustomUserSerializer,NotificationSerializer
import ipdb


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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def book_caretaker(request):
    caretaker_id = request.data.get('caretaker_id')
    booking_date = request.data.get('booking_date') 
    location = request.data.get('location')  
    number = request.data.get('number')
    note = request.data.get('note')

    # Validate caretaker exists       
    try:
        caretaker = Caretaker.objects.get(id=caretaker_id)
    except Caretaker.DoesNotExist:
        return Response({"detail": "Caretaker does not exist"}, status=status.HTTP_404_NOT_FOUND)

    # Parse full datetime (with time, not just date)
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
        note=note
    )
    booking.save()

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
