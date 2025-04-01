from django.db import models

class Violation(models.Model):
    id = models.AutoField(primary_key=True)  # Auto-incrementing ID
    or_sec_no = models.CharField(max_length=255, unique=True, db_index=True)  # Unique & Indexed for Fast Lookups
    descriptions = models.TextField()

    class Meta:
        db_table = 'tbl_violation'

    def __str__(self):
        return f"{self.or_sec_no} - {self.descriptions}"


class Citation(models.Model):   
    id = models.AutoField(primary_key=True)  
    citation_no = models.CharField(max_length=25, unique=True, db_index=True)  
    full_name = models.CharField(max_length=255, blank=True, null=True)  
    birthday = models.CharField(max_length=50, blank=True, null=True)  
    gender = models.CharField(max_length=6, choices=[('Male', 'Male'), ('Female', 'Female')], blank=True, null=True)  
    age = models.CharField(max_length=50,blank=True, null=True)  
    full_address = models.CharField(max_length=255, blank=True, null=True)  
    driv_lic = models.CharField(max_length=100, blank=True, null=True)  
    exp_date = models.CharField(max_length=50, blank=True, null=True)  
    reg_owner = models.CharField(max_length=150, blank=True, null=True)  
    reg_address = models.CharField(max_length=255, blank=True, null=True)  
    veh_type = models.CharField(max_length=50, blank=True, null=True)  
    plate_no = models.CharField(max_length=50, blank=True, null=True)  
    crt_reg_no = models.CharField(max_length=50, blank=True, null=True)  
    franc_no = models.CharField(max_length=15, blank=True, null=True)  
    place_of_viola = models.CharField(max_length=255, blank=True, null=True)  
    date_of_viola = models.CharField(max_length=50,blank=True, null=True)  
    time_of_viola = models.CharField(max_length=50,blank=True, null=True)  
    amounts = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)  
    remarks = models.TextField(blank=True, null=True)  
    app_officer = models.CharField(max_length=150, blank=True, null=True)  
    violations = models.ManyToManyField('Violation', related_name='citations', db_table='tbl_citation_violations', blank=True)  

    created_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_now=True)  

    class Meta:
        db_table = 'tbl_citation'  # ✅ Explicitly set table name
        verbose_name = 'Citation'  # ✅ Optional: Singular name for Admin panel
        verbose_name_plural = 'Citations'  # ✅ Optional: Plural name for Admin panel

    def __str__(self):
        return f"{self.citation_no} - {self.full_name}"

