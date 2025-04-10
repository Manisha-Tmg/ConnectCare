from rest_framework import serializers
from .models import Caretaker
from django.contrib.auth import authenticate
from .models import CustomUser,Booking,Notification,NotificationCaretaker
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password



class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(required=False)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        # Try authenticating as CustomUser first
        if email:
            user = authenticate(email=email, password=password)
        
        else:
            raise serializers.ValidationError("Email  is required.")

        if user is None:
            # If user not found, try authenticating as Caretaker
            try:
                caretaker = Caretaker.objects.get(email=email)
                if not check_password(password, caretaker.password):
                    raise serializers.ValidationError("Invalid credentials.")
            except Caretaker.DoesNotExist:
                    raise serializers.ValidationError("Invalid credentials.")

            return {"caretaker": caretaker}

        # If user is found, return user object
        if user and not user.is_active:
            raise serializers.ValidationError("User account is inactive.")
        return {"user": user}  # Ensure 'user' is returned for CustomUser
