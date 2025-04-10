from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from ...Models.user_models import CustomUser
from ...Models.caretaker_models import Caretaker


# update status of the caretaker after registration
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def change_caretaker_status(request, id):
    try:
        caretaker = Caretaker.objects.get(id=id)
        caretaker.is_approved = request.data.get('is_approved', caretaker.is_approved)
        caretaker.save()
        return Response({
            "message": "Status updated",
            "is_approved": caretaker.is_approved
        }, status=status.HTTP_200_OK)
    except Caretaker.DoesNotExist:
        return Response({"error": "Caretaker not found"}, status=status.HTTP_404_NOT_FOUND)






# update status of the user after registration
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def change_user_status(request, id):
    try:
        user = CustomUser.objects.get(id=id)
        user.is_approved = request.data.get('is_approved', user.is_approved)
        user.save()
        return Response({
            "message": "Status updated",
            "is_approved": user.is_approved
        }, status=status.HTTP_200_OK)
    except Caretaker.DoesNotExist:
        return Response({"error": "user not found"}, status=status.HTTP_404_NOT_FOUND)

