from rest_framework import viewsets
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view,permission_classes
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
                'email': user.email,
                'role': user.role  # Include role in response
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CaretakerLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            Caretaker = serializer.validated_data.get('caretaker')  

            refresh = RefreshToken.for_user(Caretaker)  # Generate JWT tokens
            return Response({
                'caretaker_id': Caretaker.id,
                'refresh': str(refresh),
                'access_token': str(refresh.access_token),
                'username': Caretaker.username,
                'email': Caretaker.email,
                'role': Caretaker.role  # Include role in response
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
@permission_classes([IsAuthenticated])# so that anyone see the list of user
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
# @allowc
@permission_classes([IsAuthenticated])  # Ensure user is logged in
def book_caretaker(request):
    caretaker_id = request.data.get('caretaker_id')
    booking_date = request.data.get('booking_date') 
    location = request.data.get('location')  # New Field
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

    return Response(BookingSerializer(booking).data, status=status.HTTP_201_CREATED)

# @api_view(["POST"])
# @permission_classes([AllowAny])
# def 

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])  # Ensure user is logged in
# def book_caretaker(request):
#     caretaker_id = request.data.get('caretaker_id')
#     booking_date = request.data.get('booking_date')
#     location = request.data.get('location')  # New Field
#     number = request.data.get('number')  # New Field

#     if not location or not number:
#         return Response({"detail": "Location and number are required"}, status=status.HTTP_400_BAD_REQUEST)

#     # Validate caretaker exists
#     try:
#         caretaker = Caretaker.objects.get(id=caretaker_id)
#     except Caretaker.DoesNotExist:
#         return Response({"detail": "Caretaker does not exist"}, status=status.HTTP_404_NOT_FOUND)

#     # Validate and convert booking date (only date part)
#     try:
#         booking_date = datetime.strptime(booking_date, "%Y-%m-%d")  # Parse date
#     except ValueError:
#         return Response({"detail": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

#     # Save booking with location and number
#     booking = Booking(
#         user=request.user,
#         caretaker=caretaker,
#         booking_date=booking_date,
#         status="Pending",
#          # Save number
#     )
#     booking.save()

#     return Response(BookingSerializer(booking).data, status=status.HTTP_201_CREATED)