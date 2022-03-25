<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class MainController extends Controller
{
    public function index()
    {
        $contents = str_replace(url('/')."/", "", view('calculator')->render());
        $file = base_path("build/index.html");
        file_put_contents($file, $contents, LOCK_EX);
        
        File::deleteDirectory(base_path('build/css'));
        File::copyDirectory(public_path('css'), base_path('build/css'));
        File::deleteDirectory(base_path('build/js'));
        File::copyDirectory(public_path('js'), base_path('build/js'));
        return view('calculator');
    }
}
