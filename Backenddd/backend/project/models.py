from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.utils import timezone
from cloudinary.models import CloudinaryField
from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth import get_user_model
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
    # groups = models.ManyToManyField(Group, related_name="customuser_groups")
    # user_permissions = models.ManyToManyField(Permission, related_name="customuser_permissions")

   
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  


    def __str__(self):
        return self.email



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


# notification
user = get_user_model()
class Notification(models.Model):
    user=models.ForeignKey(CustomUser,on_delete=models.CASCADE ,related_name="Notification")
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return  f"message{self.user.email} -{self.message[:20]}"
    

