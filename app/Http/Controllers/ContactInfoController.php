<?php

namespace App\Http\Controllers;

use App\Models\ContactInfo;
use Illuminate\Http\Request;
use App\Http\Resources\ContactInfoResource;

class ContactInfoController extends Controller
{

    public function index()
    {

        return ContactInfoResource::collection(ContactInfo::paginate(50));
    }


    public function show(ContactInfo $contactInfo)
    {
        return new ContactInfoResource($contactInfo);
    }


    public function update(Request $request, ContactInfo $contactInfo)
    {

        $data = $request->validate([
            'mail' => ['nullable', 'email'],
            'mail_dos' => ['nullable', 'email'],
            'phone' => ['nullable', 'string'],
            'wp' => ['nullable', 'string'],
            'location' => ['nullable', 'string'],
            'ig' => ['nullable', 'string'],
            'fb' => ['nullable', 'string'],
        ]);
        $contactInfo->update($data);
    }
}
