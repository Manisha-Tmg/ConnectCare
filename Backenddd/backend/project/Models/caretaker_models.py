from django.db import models
from django.utils import timezone
from cloudinary.models import CloudinaryField
from django.core.validators import RegexValidator


class Caretaker(models.Model):
    # Personal Information 
    name = models.CharField(max_length=255)
    
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, null=True, blank=True)
    
    profile_picture = CloudinaryField('Upload Profile Picture', null=True, blank=True)

    # Contact Information
    email = models.EmailField(unique=True)
    phone = models.CharField(
        max_length=10,
        validators=[RegexValidator(regex=r'^\d{10}$', message="Enter exactly 10 digits.")]
    )
    address = models.TextField(max_length=150, null=True, blank=True)

    # Professional Details
    experience = models.IntegerField(help_text="Years of experience")
    
    SPECIALTY_CHOICES = [
        ('Elder Care', 'Elder Care'),
        ('Medication Management', 'Medication Management'),
        ('Physical Therapy', 'Physical Therapy'),
    ]

    specialty = models.CharField(max_length=50, choices=SPECIALTY_CHOICES, null=True, blank=True)  # Fixed field name
    previous_experience = models.TextField(null=True, blank=True)


    # Rates
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    # Additional Information
    languages_spoken = models.TextField(null=True, blank=True)
    bio = models.TextField(null=True, blank=True)

    # Document Uploads
    gov_id = CloudinaryField('Upload Profile Citizenship', null=True, blank=True)
    certification_docs = CloudinaryField('Upload Profile Certificate Documents', null=True, blank=True)
    police_clearance = CloudinaryField('Upload Profile Police Clearance', null=True, blank=True)

    # Account Information
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=255)  

    # Status & Timestamps
    is_available = models.BooleanField(default=True)
    is_approved = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    role = models.CharField(max_length=20, default='caretaker')

    def __str__(self):
        return self.name
