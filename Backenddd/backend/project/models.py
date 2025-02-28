from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth import get_user_model


class CustomUser(AbstractUser):
       
    last_name=models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    first_name=models.CharField(max_length=150)
    role = models.CharField(max_length=10,  default='user')
    groups = models.ManyToManyField(Group, related_name="customuser_groups")
    user_permissions = models.ManyToManyField(Permission, related_name="customuser_permissions")

   
    USERNAME_FIELD = 'username'  
    REQUIRED_FIELDS = []  

    def __str__(self):
        return self.username





class Caretaker(models.Model):

    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    experience = models.IntegerField()  
    specialty = models.CharField(max_length=255)  
    password = models.CharField(max_length=255)  
    is_available = models.BooleanField(default=True)    
    created_at = models.DateTimeField(default=timezone.now)  
    updated_at = models.DateTimeField(auto_now=True)
    role = models.CharField(max_length=20, default='caretaker')
    username = models.CharField(max_length=150, unique=True)


   
    def __str__(self):
        return self.name


class Booking(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)  # Link to User
    caretaker = models.ForeignKey(Caretaker, on_delete=models.CASCADE)  # Link to Caretaker
    booking_date = models.DateTimeField()  # Date and time of booking
    status = models.CharField(max_length=20, default='Pending')  # Status of booking (e.g., Pending, Confirmed, etc.)

    def __str__(self):
        return f"Booking by {self.user.id} for {self.caretaker.name} on {self.booking_date}"


