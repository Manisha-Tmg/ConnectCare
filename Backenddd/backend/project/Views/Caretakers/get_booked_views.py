from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import update_last_login
from ...Serializer.User.booking_serializer import BookingSerializer
from ...Models.booking_models import Booking


@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensure only authenticated users can access
def get_CaretakerBooking(request, caretaker_id=None, booking_id=None):
    caretaker = request.user  # Get the logged-in user

    # Check if the provided caretaker_id matches the logged-in caretaker's ID
    if caretaker_id and caretaker.id != int(caretaker_id):
        return Response({"error": "Unauthorized access"}, status=403)

    if booking_id:
        try:
            booking = Booking.objects.get(id=booking_id, caretaker_id=caretaker.id)  # Filter by caretaker_id
            serializer = BookingSerializer(booking)
            return Response(serializer.data, status=200)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found or unauthorized"}, status=404)
    
    else:
        bookings = Booking.objects.filter(caretaker_id=caretaker.id)  # Filter bookings for the given caretaker
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data, status=200)

