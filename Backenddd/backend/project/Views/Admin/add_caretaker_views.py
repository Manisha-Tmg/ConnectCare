from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from ...Serializer.Caretaker.caretaker_serializers import CaretakerSerializer
from rest_framework import status, permissions,generics


class CaretakerRegistrationView(APIView):
   
    permission_classes = [AllowAny]  # To allow anyone to log in

    def post(self, request):
        serializer = CaretakerSerializer(data=request.data)
        if serializer.is_valid():
            caretaker = serializer.save() 
            caretaker.role = 'caretaker'
            caretaker.save()
            return Response({
                "message": "Caretaker registered successfully!",
                "user": {
                    "username": caretaker.username,   
                    "name":caretaker.name,
                      "gender" :caretaker.gender,
                      "address"  :caretaker.address,     
                      "phone"  :caretaker.phone,    
                      "email": caretaker.email,
                    "role": caretaker.role  # Send role in response to navigate to roles based home
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
