from django.contrib.auth.hashers import check_password
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
   
    send_mail (
        subject="Booking update ",
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,  
        recipient_list=[booking.user.email],
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
    total_pending = Booking.objects.filter(caretaker_id=caretaker_id).count()
    completed_tasks = Booking.objects.filter(caretaker_id=caretaker_id).count()

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
    