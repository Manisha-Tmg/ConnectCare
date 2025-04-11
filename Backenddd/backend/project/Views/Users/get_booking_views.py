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
@permission_classes([IsAuthenticated])  # Ensure only authenticated users can access
def get_Booking(request, booking_id=None):
    user = request.user  # Get the logged-in user

    if booking_id:
        try:
            booking = Booking.objects.get(id=booking_id, user=user)  # Filter by user
            serializer = BookingSerializer(booking)  
            return Response(serializer.data, status=200)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found or unauthorized"}, status=404)

    else:
        bookings = Booking.objects.filter(user=user)  # Fetch all bookings for the logged-in user
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data, status=200)

