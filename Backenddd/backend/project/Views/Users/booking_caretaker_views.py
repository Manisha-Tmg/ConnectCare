from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from datetime import datetime
from ...Models.booking_models import Booking
from ...Models.caretaker_models import Caretaker


@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensure user is logged in
def book_caretaker(request):
    caretaker_id = request.data.get('caretaker_id')
    booking_date = request.data.get('booking_date') 
    location = request.data.get('location')  
    number = request.data.get('number')
    note = request.data.get('note')
    
    # Validate caretaker exists
    try:
        caretaker = Caretaker.objects.get(id=caretaker_id)
    except Caretaker.DoesNotExist:
        return Response({"detail": "Caretaker does not exist"}, status=status.HTTP_404_NOT_FOUND)

    # Validate and convert booking date (only date part)
    try:
        booking_date = datetime.strptime(booking_date, "%Y-%m-%d")  # Parse date
        booking_date = booking_date.replace(hour=0, minute=0, second=0, microsecond=0)  # Set time to midnight
    except ValueError:
        return Response({"detail": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

    # Create and save booking
    booking = Booking(user=request.user, caretaker=caretaker, booking_date=booking_date, status="Pending",location=location,  # Save location
        number=number,note=note)
    booking.save()

    # Check if saved
    if not Booking.objects.filter(id=booking.id).exists():
        return Response({"detail": "Booking not saved due to unknown error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"booking_id": booking.id, **BookingSerializer(booking).data}, status=status.HTTP_201_CREATED)

