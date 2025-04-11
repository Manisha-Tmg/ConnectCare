from ...Models.user_models import CustomUser
from rest_framework import serializers


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

