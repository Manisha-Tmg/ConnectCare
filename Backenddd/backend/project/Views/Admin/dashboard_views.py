from rest_framework.decorators import api_view, permission_classes
from ...Models.caretaker_models import Caretaker
from ...Models.booking_models import Booking
from ...Models.user_models import CustomUser
from rest_framework.response import Response
from rest_framework import status


@api_view(["GET"])
# @permission_classes([AllowAny])
def admin_dashboard(request):
    total_caretaker = Caretaker.objects.count()
    total_user = CustomUser.objects.count()
    total_bookings = Booking.objects.count()

    return Response({
        "total_caretaker": total_caretaker,
        "total_user": total_user,
        "total_bookings": total_bookings
    }, status=status.HTTP_200_OK)



