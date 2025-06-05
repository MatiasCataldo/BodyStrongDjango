from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import TeamMember, MembershipPlan

admin.site.site_header = "Administración de Body Strong"
admin.site.site_title = "Panel de Administración de Body Strong"
admin.site.index_title = "Bienvenido al Panel de Administración"

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name', 'position')

@admin.register(MembershipPlan)
class MembershipPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'price', 'duration_months')
    list_editable = ('price',)