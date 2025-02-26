from rest_framework import viewsets
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from .serializers import UserRegistrationSerializer
from .serializers import LoginSerializer

# User ViewSet for CRUD operations
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserRegistrationSerializer
    queryset = get_user_model().objects.all()

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
                'refresh': str(refresh),
                'access_token': str(refresh.access_token),
                'username': user.username,
                'email': user.email,
                'role': user.role  # Include role in response
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
