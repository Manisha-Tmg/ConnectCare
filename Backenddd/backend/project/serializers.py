from rest_framework import serializers
from .models import Caretaker
from django.contrib.auth import authenticate
from .models import CustomUser,Booking
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        first_name = validated_data.pop('first_name', None)
        last_name = validated_data.pop('last_name', None)

        username = validated_data.get('username')
        email = validated_data.get('email')

        if CustomUser.objects.filter(username=username).exists():
            raise serializers.ValidationError({"username": "Username already exists."})

        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "Email already exists."})

        validated_data['password'] = make_password(validated_data['password'])
        user = CustomUser.objects.create(**validated_data)

        if first_name:
            user.first_name = first_name
        if last_name:
            user.last_name = last_name

        user.is_active = True
        user.role = 'user'  # Default role as 'user'
        user.save()

        return user





class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        # Try authenticating as CustomUser first
        user = authenticate(username=username, password=password)

        if user is None:
            # If user not found, try authenticating as Caretaker
            try:
                caretaker = Caretaker.objects.get(username=username)
                # Assuming caretakers have their password stored in a hashed format, similar to the user
                if caretaker.password != password:  # This is a basic check, improve password validation here
                    raise serializers.ValidationError("Invalid credentials.")
            except Caretaker.DoesNotExist:
                raise serializers.ValidationError("Invalid credentials.")
            # If a caretaker is found and credentials match, return a caretaker object
            return {"caretaker": caretaker}

        # If user is found, return user object
        if user and not user.is_active:
            raise serializers.ValidationError("User account is inactive.")
        return {"user": user}  # Ensure 'user' is returned for CustomUser



class CaretakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caretaker
        fields = '__all__'



class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['user','caretaker','booking_date',"status","location","number"]
        

# class BookingCaretakerSerializer(serializers.ModelSerializer):
#        class Meta:
#         model = CaretakerBooking
#         fields = ['status','caretaker_id','user_id']



class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'



class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "New passwords do not match."})

        validate_password(data['new_password'])

        return data



