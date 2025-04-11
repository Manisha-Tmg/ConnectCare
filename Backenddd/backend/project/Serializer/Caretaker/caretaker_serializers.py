from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from ...Models.caretaker_models import Caretaker


class CaretakerSerializer(serializers.ModelSerializer):
    profile_picture_url = serializers.SerializerMethodField()
    gov_id_url = serializers.SerializerMethodField()
    certification_docs_url = serializers.SerializerMethodField()
    police_clearance_url = serializers.SerializerMethodField()

    class Meta:
        model = Caretaker
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.get('password')
        if password:
            validated_data['password'] = make_password(password)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        password = validated_data.get('password', None)
        if password:
            validated_data['password'] = make_password(password)
        return super().update(instance, validated_data)

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

