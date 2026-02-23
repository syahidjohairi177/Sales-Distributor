<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureHrUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, \Closure $next)
{
    $user = $request->user();

    if (!$user || $user->email !== 'hr@test.com') {
        return response()->json(['message' => 'Forbidden (HR only)'], 403);
    }

    return $next($request);
}
}
