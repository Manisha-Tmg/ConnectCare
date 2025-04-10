from rest_framework import serializers
from ...Models.booking_models import Booking
from rest_framework import serializers
from rest_framework import serializers



class BookingSerializer(serializers.ModelSerializer):
    caretaker_name = serializers.CharField(source='caretaker.name', read_only=True)
    class Meta:
        model = Booking
        fields = ['id','user','caretaker','booking_date',"status",'location','number','note','name',"caretaker_name"]
        