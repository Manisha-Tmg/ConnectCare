from django.contrib.auth.hashers import check_password
from .serializers import CaretakerSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from .models import Booking,Notification
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CaretakerSerializer,BookingSerializer,LoginSerializer
from rest_framework.views import APIView
from django.contrib.auth import get_user_model




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

