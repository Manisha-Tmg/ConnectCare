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
from django.shortcuts import get_object_or_404
from ...Models.booking_models import Booking
from ...Models.notification_models import Notification
from django.contrib.auth import get_user_model




@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def booking_action(request, booking_id):
    try:
        booking = Booking.objects.get(id=booking_id, caretaker_id=request.user.id)
    except Booking.DoesNotExist:
        return Response({"error": "Booking not found or unauthorized"}, status=status.HTTP_404_NOT_FOUND)

    action = request.data.get("action")

    if action == "accept":
        booking.status = "accepted"
        message = f"Your booking with {booking.caretaker.name} has been accepted!"
    elif action == "reject":
        booking.status = "rejected"
        message = f"Your booking with {booking.caretaker.name} has been rejected."
    else:
        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)

    booking.save()

    # Create Notification for the user who made the booking
    Notification.objects.create(
        user=booking.user,
        message=message,
        is_read=False  # default, but good to be explicit

    )



    return Response({"message": f"Booking {booking.status} successfully"}, status=status.HTTP_200_OK)

