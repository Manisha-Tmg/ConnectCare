from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth import get_user_model
# from django.conf import settings  
from django.core.validators import RegexValidator



class CustomUser(AbstractUser):
    address = models.CharField(max_length=150)
    number = models.CharField(
        max_length=10,
        validators=[
             RegexValidator(
                regex=r'^\d{10}$',
                message="Enter exactly 10 digits." 
                )#validating the number
            ]
            ) 
    email = models.EmailField(unique=True)
    last_name=models.CharField(max_length=150)
    first_name=models.CharField(max_length=150)
    role = models.CharField(max_length=10,  default='user')
    groups = models.ManyToManyField(Group, related_name="customuser_groups")
    user_permissions = models.ManyToManyField(Permission, related_name="customuser_permissions")

   
    USERNAME_FIELD = 'username'  
    REQUIRED_FIELDS = []  

    def __str__(self):
        return self.username




class Caretaker(models.Model):
    # user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='caretaker')
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
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]
     
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)  # Link to User
    caretaker = models.ForeignKey(Caretaker, on_delete=models.CASCADE)  # Link to Caretaker
    booking_date = models.DateTimeField()  # Date and time of booking
    number = models.BigIntegerField(null=True, blank=True) 
    location = models.CharField(max_length=20, null=True, blank=True)
    status = models.CharField(max_length=20, default='Pending') 
    payment = models.CharField(max_length=150)
    last_name=models.CharField(max_length=150)
    first_name=models.CharField(max_length=150)
    note =  models.CharField(max_length=250)
    def __str__(self):
        return f"Booking by {self.user.id} for {self.caretaker.name} on {self.booking_date}"


