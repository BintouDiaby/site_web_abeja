import json
from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from .models import Comment, Contact
from django.db import DatabaseError
import os, json

def json_body(request):
    try:
        return json.loads(request.body.decode('utf-8')) if request.body else {}
    except Exception:
        return None

def comments(request):
    if request.method == 'GET':
        path = request.GET.get('path','')
        try:
            qs = Comment.objects.filter(path=path).order_by('date') if path else Comment.objects.all().order_by('date')
            return JsonResponse([c.to_dict() for c in qs], safe=False)
        except DatabaseError:
            # Likely the database table doesn't exist yet (migrations not applied).
            # Return an empty list rather than raising a 500 so the frontend can fall back to localStorage.
            return JsonResponse([], safe=False)

    if request.method == 'POST':
        data = json_body(request)
        if data is None:
            return HttpResponseBadRequest('invalid json')
        name = data.get('name')
        message = data.get('message')
        if not name or not message:
            return HttpResponseBadRequest('name and message required')
        try:
            c = Comment.objects.create(path=data.get('path',''), name=name, email=data.get('email',''), website=data.get('website',''), message=message)
            res = c.to_dict()
            # preserve owner token if client provided one (lightweight ownership)
            if data.get('owner_token'):
                res['owner_token'] = data.get('owner_token')
            return JsonResponse(res, status=201)
        except DatabaseError:
            # Save comment locally to a JSON file as a fallback when DB/migrations are not ready.
            fallback_file = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'comments_fallback.json')
            try:
                existing = []
                if os.path.exists(fallback_file):
                    with open(fallback_file, 'r', encoding='utf-8') as f:
                        existing = json.load(f)
                obj = { 'path': data.get('path',''), 'name': name, 'email': data.get('email',''), 'website': data.get('website',''), 'message': message, 'date': json.dumps(str(__import__('datetime').datetime.utcnow())) }
                existing.append(obj)
                with open(fallback_file, 'w', encoding='utf-8') as f:
                    json.dump(existing, f, ensure_ascii=False, indent=2)
            except Exception:
                pass
            # return owner_token back to client when saved locally as fallback
            resp = {'status':'saved_local'}
            if data.get('owner_token'):
                resp['owner_token'] = data.get('owner_token')
            return JsonResponse(resp, status=201)

    return JsonResponse({'error':'method not allowed'}, status=405)

@csrf_exempt
def contact(request):
    if request.method != 'POST':
        return JsonResponse({'error':'method not allowed'}, status=405)
    data = json_body(request)
    if data is None:
        return HttpResponseBadRequest('invalid json')
    c = Contact.objects.create(first_name=data.get('first_name',''), last_name=data.get('last_name',''), email=data.get('email',''), subject=data.get('subject',''), message=data.get('message',''))
    return JsonResponse({'status':'saved'})
