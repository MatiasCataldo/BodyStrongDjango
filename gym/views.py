from django.db import models
from .models import TeamMember, MembershipPlan
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from .models import TeamMember, MembershipPlan

def home(request):
    team_members = TeamMember.objects.filter(is_active=True)
    
    # Orden personalizado de los planes
    membership_plans = MembershipPlan.objects.annotate(
        custom_order=models.Case(
            models.When(name__icontains='mensual', then=1),
            models.When(name__icontains='2 meses', then=2),
            models.When(name__icontains='3 meses', then=3),
            models.When(name__icontains='familiar', then=4),
            default=5,
            output_field=models.IntegerField(),
        )
    ).order_by('custom_order')
    
    return render(request, 'gym/home.html', {
        'team_members': team_members,
        'membership_plans': membership_plans
    })