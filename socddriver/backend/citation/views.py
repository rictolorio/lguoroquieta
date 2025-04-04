from rest_framework import viewsets
from rest_framework.response import Response
from .models import Citation, Violation
from .serializers import CitationSerializer, ViolationSerializer

class CitationViewSet(viewsets.ModelViewSet):
    queryset = Citation.objects.all()
    serializer_class = CitationSerializer

    def create(self, request, *args, **kwargs):
        # Handling creation of Citation and its associated Violations
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            citation = serializer.save()  # Create citation
            return Response({
                'id': citation.id,
                'citation_no': citation.citation_no,
                'message': 'Citation successfully created with violations!'
            }, status=201)
        return Response(serializer.errors, status=400)

    def update(self, request, *args, **kwargs):
        # Handling update of Citation and its associated Violations
        citation = self.get_object()  # Get the existing citation
        serializer = self.get_serializer(citation, data=request.data, partial=True)

        if serializer.is_valid():
            citation = serializer.save()  # Update citation

            # Now, handle violations update
            new_violations = request.data.get('violation_ids', [])
            citation.violations.set(Violation.objects.filter(id__in=new_violations))  # Update the violations

            return Response({
                'id': citation.id,
                'citation_no': citation.citation_no,
                'message': 'Citation and violations successfully updated!'
            })
        return Response(serializer.errors, status=400)


class ViolationViewSet(viewsets.ModelViewSet):
    queryset = Violation.objects.all()
    serializer_class = ViolationSerializer
