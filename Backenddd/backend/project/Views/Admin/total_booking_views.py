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
from ...Serializer.User.booking_serializer import BookingSerializer
from django.shortcuts import get_object_or_404
from ...Models.booking_models import Booking


@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Optionally restrict to only admin users
def get_all_bookings(request, booking_id=None):
    if booking_id:
        try:
            booking = Booking.objects.get(id=booking_id)
            serializer = BookingSerializer(booking)
            return Response(serializer.data, status=200)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=404)

    bookings = Booking.objects.all().order_by('-created_at')  # Get all bookings
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data, status=200)
