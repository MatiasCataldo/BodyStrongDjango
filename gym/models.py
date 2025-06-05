from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    MEMBERSHIP_CHOICES = [
        ('BASIC', 'Básico'),
        ('PREMIUM', 'Premium'),
        ('FAMILY', 'Familiar')
    ]
    membership = models.CharField(
        max_length=10, 
        choices=MEMBERSHIP_CHOICES,
        default='BASIC'
    )
    phone = models.CharField(max_length=15)
    birth_date = models.DateField(null=True)

class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    bio = models.TextField()
    image = models.ImageField(upload_to='team/')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class MembershipPlan(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    image = models.ImageField(upload_to='membership_plans/', blank=True, null=True)
    duration_months = models.IntegerField()
    features = models.TextField()

    def __str__(self):
        return f"{self.name} - ${self.price}/mes"