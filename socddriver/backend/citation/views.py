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


class ViolationViewSet(viewsets.ModelViewSet):
    queryset = Violation.objects.all()
    serializer_class = ViolationSerializer
