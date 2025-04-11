from rest_framework import serializers
from ...Models.user_models import CustomUser
from django.contrib.auth.hashers import make_password



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

     