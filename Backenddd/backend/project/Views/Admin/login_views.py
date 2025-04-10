from rest_framework import viewsets
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.middleware.csrf import get_token
from .serializers import UserRegistrationSerializer,LoginSerializer,CaretakerSerializer,BookingSerializer,CustomUserSerializer,NotificationSerializer,NotificationCaretakerSerializer


class AdminLoginView(APIView):
    permission_classes = [IsAdminUser]  

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
                'csrf_token': get_token(request), 
                'username': user.username,
                'role' :user.role,
            }, status=status.HTTP_200_OK)
        

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
