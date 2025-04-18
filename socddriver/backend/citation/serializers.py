from rest_framework import serializers
from .models import Citation, Violation

class ViolationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Violation
        fields = ['id','or_sec_no', 'descriptions']  # Ensure correct field names

class CitationSerializer(serializers.ModelSerializer):
    violations = ViolationSerializer(many=True, read_only=True)  # Nest violations correctly
    violation_ids = serializers.ListField(write_only=True, child=serializers.IntegerField(), required=False)

    class Meta:
        model = Citation
        fields = [
            "id", "citation_no", "full_name", "birthday", "age", "gender", "full_address", 
            "driv_lic", "exp_date", "reg_owner", "reg_address", "veh_type", "plate_no", 
            "crt_reg_no", "franc_no", "place_of_viola", "date_of_viola", "time_of_viola", 
            "amounts", "remarks", "app_officer", "violations", "violation_ids"
        ]

    def create(self, validated_data):
        violation_ids = validated_data.pop('violation_ids', [])
        citation = Citation.objects.create(**validated_data)

        # Add violations using the violation IDs
        citation.violations.set(violation_ids)

        return citation



