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


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'name', 'address','phone','gender','profile_picture','role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        name = validated_data.pop('name', None)
        gender = validated_data.pop('gender', None)
        address= validated_data.pop('address', None)
        phone= validated_data.pop('phone', None)
        profile_picture= validated_data.pop('profile_picture', None)
        username = validated_data.get('username')
        email = validated_data.get('email')

        if CustomUser.objects.filter(username=username).exists():
            raise serializers.ValidationError({"username": "Username already exists."})

        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "Email already exists."})

        validated_data['password'] = make_password(validated_data['password'])
        user = CustomUser.objects.create(**validated_data)

        if name:
            user.name = name

        if gender:
            user.gender = gender

        if profile_picture:
            user.profile_picture=profile_picture

        if address:
            user.address = address

        if phone:
            user.phone = phone

        user.is_active = True
        user.role = 'user'  # Default role as 'user'
        user.save()

        return user



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
                caretaker = Caretaker.objects.get(password=password , email =email)
                # Assuming caretakers have their password stored in a hashed format,ie. similar to the user
                if caretaker.password != password:  #checking password, improve password validation here
                    raise serializers.ValidationError("Invalid credentials.")
            except Caretaker.DoesNotExist:
                raise serializers.ValidationError("Invalid credentials.")
            # If a caretaker is found and credentials match, return a caretaker object
            return {"caretaker": caretaker}

        # If user is found, return user object
        if user and not user.is_active:
            raise serializers.ValidationError("User account is inactive.")
        return {"user": user}  # Ensure 'user' is returned for CustomUser


# caretaker
class CaretakerSerializer(serializers.ModelSerializer):
    profile_picture_url = serializers.SerializerMethodField()
    gov_id_url = serializers.SerializerMethodField()
    certification_docs_url = serializers.SerializerMethodField()
    police_clearance_url = serializers.SerializerMethodField()

    class Meta:
        model = Caretaker
        fields = '__all__'

    def get_profile_picture_url(self, obj):
        return self.get_cloudinary_url(obj.profile_picture)

    def get_gov_id_url(self, obj):
        return self.get_cloudinary_url(obj.gov_id)

    def get_certification_docs_url(self, obj):
        return self.get_cloudinary_url(obj.certification_docs)

    def get_police_clearance_url(self, obj):
        return self.get_cloudinary_url(obj.police_clearance)

    def get_cloudinary_url(self, field):
        if field:
            return f"https://res.cloudinary.com/ddh1i3vod/{field}"
        return None

# booking
class BookingSerializer(serializers.ModelSerializer):
    caretaker_name = serializers.CharField(source='caretaker.name', read_only=True)
    class Meta:
        model = Booking
        fields = ['id','user','caretaker','booking_date',"status",'location','number','note','name',"caretaker_name"]
        


# user
class CustomUserSerializer(serializers.ModelSerializer):
    profile_picture_url = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = '__all__'
        
    def get_profile_picture_url(self, obj):
        return self.get_cloudinary_url(obj.profile_picture)

  
    def get_cloudinary_url(self, field):
        if field:
            return f"https://res.cloudinary.com/ddh1i3vod/{field}"# for image url
        return None

# changepass
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "New passwords do not match."})

        validate_password(data['new_password'])

        return data



# notification
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'message', 'is_read', 'created_at', 'user']



# notification for caretaker
class NotificationCaretakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationCaretaker
        fields = ['id', 'message', 'is_read', 'created_at', 'caretaker']
