from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils import timezone
from django.contrib.auth import get_user_model
from cloudinary.models import CloudinaryField
from django.core.validators import RegexValidator



class CustomUser(AbstractUser):
    address = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=150)
    
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, null=True, blank=True)
    
    profile_picture = CloudinaryField('Upload Profile Picture', null=True, blank=True)

    # Contact Information
    phone = models.CharField(
        max_length=10,
        validators=[RegexValidator(regex=r'^\d{10}$', message="Enter exactly 10 digits.")]
    )

    # Account Information
    username = models.CharField(max_length=150, unique=True)

    # Status & Timestamps
    is_approved = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
  
    role = models.CharField(max_length=10,  default='user')
   
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  


    def __str__(self):
        return {self.email}




# notification models

user = get_user_model()
class Notification(models.Model):
    user=models.ForeignKey(CustomUser,on_delete=models.CASCADE ,related_name="Notification")
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return  f"message{self.user.email} -{self.message[:20]}"
    
