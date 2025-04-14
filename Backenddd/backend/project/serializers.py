from rest_framework import serializers
from .models import Caretaker
from django.contrib.auth import authenticate
from .models import CustomUser,Booking,Notification
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from .models import Caretaker
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.hashers import check_password


class UserRegistrationSerializer(serializers.ModelSerializer):
    profile_picture_url = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = [
            'username', 'email', 'password', 'name', 'address', 'phone',
            'gender', 'profile_picture', 'role', 'profile_picture_url'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'role': {'read_only': True},
        }

    def get_profile_picture_url(self, obj):
        if obj.profile_picture:
            return obj.profile_picture.url
        return None

    def validate_username(self, value):
        if CustomUser.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists.")
        return value

    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.password = make_password(password)
        user.is_active = True
        user.role = 'user'
        user.save()
        return user





class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(required=False)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        # Try authenticating the email  pass as CustomUser first
        if email:
            user = authenticate(email=email, password=password)
        else:
            raise serializers.ValidationError("Email is required.")

        if user is None:
            # If user not found, try authenticating as Caretaker
            try:
                caretaker = Caretaker.objects.get(email=email)
                if not check_password(password, caretaker.password):
                    raise serializers.ValidationError("Invalid credentials.")
            except Caretaker.DoesNotExist:
                raise serializers.ValidationError("Invalid credentials.")
            # If caretaker is found, return the caretaker object as part of validated data
            return {"caretaker": caretaker}
        
        # If user is authenticated, return user as part of validated data
        return {"user": user}

  

# caretaker
class CaretakerSerializer(serializers.ModelSerializer):
    profile_picture_url = serializers.SerializerMethodField()
    gov_id_url = serializers.SerializerMethodField()
    certification_docs_url = serializers.SerializerMethodField()
    police_clearance_url = serializers.SerializerMethodField()

    class Meta:
        model = Caretaker
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    def get_profile_picture_url(self, obj):
        return self.get_cloudinary_url(obj.profile_picture)

    def get_gov_id_url(self, obj):
        return self.get_cloudinary_url(obj.gov_id)

    def get_certification_docs_url(self, obj):
        return self.get_cloudinary_url(obj.certification_docs)

    def get_police_clearance_url(self, obj):
        return self.get_cloudinary_url(obj.police_clearance)

    def get_cloudinary_url(self, field):
        if field and hasattr(field, 'url'):
            return field.url
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





# changepass for user
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



