from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.contrib.auth import get_user_model
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('user', 'User'),
        ('caretaker', 'Caretaker'),
    ]
    
    last_name=models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    first_name=models.CharField(max_length=150)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    groups = models.ManyToManyField(Group, related_name="customuser_groups", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="customuser_permissions", blank=True)

   
    USERNAME_FIELD = 'username'  
    REQUIRED_FIELDS = ['email']  

    def __str__(self):
        return self.username



User = get_user_model() 
class CareTaker(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    experience = models.IntegerField()  # Years of experience
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    role = models.CharField(max_length=20, default='caretaker')

    def __str__(self):
        return self.name

