
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
from django.contrib.auth.hashers import check_password
from datetime import datetime
from django.contrib.auth.models import update_last_login
from ...Serializer.User.booking_serializer import BookingSerializer
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from ...Models.booking_models import Booking





@api_view(["GET"])
@permission_classes([AllowAny])
def booking_count_api(request, caretaker_id=None):
    caretaker = request.user  # Get the logged-in user

    total_bookings = Booking.objects.filter(caretaker_id).count()  # Count bookings for the login caretaker only
    return Response({"total_bookings": total_bookings}, status=status.HTTP_200_OK)

    