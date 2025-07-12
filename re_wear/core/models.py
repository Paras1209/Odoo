from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    points = models.IntegerField(default=0)

    def __str__(self):
        return self.username

class ClothingItem(models.Model):
    CATEGORY_CHOICES = [
        ('men', 'Men'),
        ('women', 'Women'),
        ('kids', 'Kids'),
        ('unisex', 'Unisex'),
    ]

    CONDITION_CHOICES = [
        ('new', 'New'),
        ('good', 'Good'),
        ('fair', 'Fair'),
    ]

    uploader = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_items')
    title = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    type = models.CharField(max_length=100)
    size = models.CharField(max_length=50)
    condition = models.CharField(max_length=10, choices=CONDITION_CHOICES)
    tags = models.CharField(max_length=255, blank=True)
    points_required = models.PositiveIntegerField(default=10)
    available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class ClothingImage(models.Model):
    item = models.ForeignKey(ClothingItem, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='clothing_images/')

    def __str__(self):
        return f"Image for {self.item.title}"

class SwapRequest(models.Model):
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='swap_requests_made')
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='swap_requests_received')
    item_requested = models.ForeignKey(ClothingItem, on_delete=models.CASCADE, related_name='requested_items')
    item_offered = models.ForeignKey(ClothingItem, on_delete=models.CASCADE, related_name='offered_items', null=True, blank=True)
    using_points = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected'), ('completed', 'Completed')], default='pending')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Swap by {self.from_user} for {self.item_requested}"

class ModerationLog(models.Model):
    item = models.ForeignKey(ClothingItem, on_delete=models.CASCADE)
    moderator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    action = models.CharField(max_length=20, choices=[('approved', 'Approved'), ('rejected', 'Rejected'), ('removed', 'Removed')])
    comment = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.action} - {self.item.title}"
