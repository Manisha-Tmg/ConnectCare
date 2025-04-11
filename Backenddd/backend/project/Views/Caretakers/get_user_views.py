from rest_framework import viewsets
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, permissions,generics
from django.shortcuts import render
from django.middleware.csrf import get_token
from django.http import JsonResponse
from datetime import datetime
from django.contrib.auth.models import update_last_login
from ...Serializer.User.user_serializers import CustomUserSerializer
from django.shortcuts import get_object_or_404
from ...Models.user_models import CustomUser
from django.contrib.auth import get_user_model





@api_view(['GET'])
@permission_classes([AllowAny])# admin can only  see the list of user
def get_user(request,user_id=None):
    if user_id:
        users = get_object_or_404(CustomUser,id=user_id)
        serializer = CustomUserSerializer(users)
        return Response(serializer.data)  # Return serialized data as response

    else:
        users = CustomUser.objects.all() #to fetch all user
        serializer = CustomUserSerializer(users,many=True)
        return Response(serializer.data)

