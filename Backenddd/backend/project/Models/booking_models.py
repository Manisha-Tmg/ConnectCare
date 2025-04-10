from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils import timezone
from django.contrib.auth import get_user_model
from cloudinary.models import CloudinaryField
from django.core.validators import RegexValidator


# Booking models
class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    ]
    
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)  # Link to User
    caretaker = models.ForeignKey("Caretaker", on_delete=models.CASCADE)  # Link to Caretaker
    name = models.CharField(max_length=150, blank=True)
    # last_name = models.CharField(max_length=150, blank=True)  # Allow blank values
    # first_name = models.CharField(max_length=150, blank=True)  # Allow blank values
    booking_date = models.DateTimeField()  
    number = models.CharField(
        max_length=10,
        validators=[
            RegexValidator(
                regex=r'^\d{10}$',
                message="Enter exactly 10 digits." 
            )
        ]
    )   
    location = models.CharField(max_length=20, null=True, blank=True)
    note = models.CharField(max_length=30, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending') 

    def save(self, *args, **kwargs):
        if self.user:
            self.first_name = self.user.first_name
            self.last_name = self.user.last_name
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Booking by {self.user.id} for {self.caretaker.name} on {self.booking_date}"
