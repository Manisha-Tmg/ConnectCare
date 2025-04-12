from rest_framework import viewsets
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.middleware.csrf import get_token
from .models import Caretaker,Booking,CustomUser
from django.contrib.auth import get_user_model
from .serializers import LoginSerializer,BookingSerializer


class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data.get('user')  

            refresh = RefreshToken.for_user(user)  # Generate JWT tokens
            return Response(
                {
                'refresh': str(refresh),
                'access_token': str(refresh.access_token),
                'csrf_token': get_token(request), 
                'username': user.username,
                'role' :user.role,  # Include role in response
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Dashboard
@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_dashboard(request):
    total_caretaker = Caretaker.objects.count()
    total_user = CustomUser.objects.count()
    total_bookings = Booking.objects.count()

    return Response({
        "total_caretaker": total_caretaker,
        "total_user": total_user,
        "total_bookings": total_bookings
    }, status=status.HTTP_200_OK)




# update status for caretaker
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



# update status for users
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






# api for deleting the user
@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_user(request, user_id):
    updated_count = CustomUser.objects.filter(id=user_id, is_delete=False).update(is_delete=True)
    if updated_count == 0:
        return Response({'message': "User not found"}, status=status.HTTP_404_NOT_FOUND)
    return Response({'message': 'User deleted successfully'}, status=status.HTTP_200_OK)



# api for deleting caretaker
@api_view(['DELETE'])
@permission_classes([IsAdminUser])

def caretaker_delete(request,caretaker_id):
    
    caretaker = Caretaker.objects.filter(id=caretaker_id,is_delete=False).update(is_delete=True)
    
    if caretaker==0:
        return Response({'message' : 'Caretaker not found'},status=status.HTTP_404_NOT_FOUND)
    
    
    return Response ({'message' : 'Caretaker deleted successfully'},status=status.HTTP_200_OK)


# total booking
@api_view(['GET'])
@permission_classes([AllowAny])  
def get_all_bookings(request, booking_id=None): 
    if booking_id:
        try:
            booking = Booking.objects.get(id=booking_id)
            serializer = BookingSerializer(booking)
            return Response(serializer.data, status=200)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found"}, status=404)
 
    bookings = Booking.objects.all()  # Get all bookings
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data, status=200)

