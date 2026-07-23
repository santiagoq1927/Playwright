def calculate_fibonacci(n):
    if n <= 1:
        return n
    print(n)
    return calculate_fibonacci(n - 1) + calculate_fibonacci(n - 2)

print(calculate_fibonacci(10))

def calcular_primos(cantidad):
    primos = []
    num = 2
    while len(primos) < cantidad:
        es_primo = True
        for i in range(2, int(num ** 0.5) + 1):
            if num % i == 0:
                es_primo = False
                break
        if es_primo:
            primos.append(num)
        num += 1
    return primos

# Ejemplo de uso: calcular y mostrar los primeros 100 primos
cien_primos = calcular_primos(100)
print(cien_primos)
