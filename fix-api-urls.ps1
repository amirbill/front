$files = @(
    "app\products\page.tsx",
    "app\products\[id]\page.tsx",
    "app\para\page.tsx",
    "app\para\[id]\page.tsx",
    "components\ParaProductShowcase.tsx",
    "components\PriceCards.tsx"
)

foreach ($file in $files) {
    $path = Join-Path "c:\Users\SBS\Desktop\1111finale\1111fn\front" $file
    if (Test-Path $path) {
        $content = Get-Content -Path $path -Raw
        
        # Check if import already exists
        if ($content -notmatch 'import \{ API_BASE_URL \}') {
            # Add import after other imports
            $content = $content -replace '(import.*?"react".*?\r?\n)', "`$1import { API_BASE_URL } from `"@/lib/api`"`r`n"
        }
        
        # Fix the API_BASE_URL usage (from string to template literal)
        $content = $content -replace '"\$\{API_BASE_URL\}', '`${API_BASE_URL}'
        $content = $content -replace '\$\{API_BASE_URL\}([^`])', '${API_BASE_URL}`$1'
        
        Set-Content -Path $path -Value $content
        Write-Host "Updated: $file"
    }
}

Write-Host "All files updated successfully!"
