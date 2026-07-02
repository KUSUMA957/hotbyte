package com.hotbyte.hotbyte.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestControllerAdvice
public class GlobalExceptionHandler {
	// ✅ Validation errors
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public Map<String, Object> handleValidationExceptions(MethodArgumentNotValidException ex) {
		List<String> errors = new ArrayList<>();
		ex.getBindingResult().getFieldErrors().forEach(error -> errors.add(error.getDefaultMessage()));
		Map<String, Object> response = new HashMap<>();
		response.put("status", 400);
		response.put("message", "Validation failed");
		response.put("errors", errors);
		return response;
	}

	// ✅ Runtime exception (like duplicate email)
	@ExceptionHandler(RuntimeException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public Map<String, Object> handleRuntimeException(RuntimeException ex) {
		Map<String, Object> response = new HashMap<>();
		response.put("status", 400);
		response.put("message", ex.getMessage());
		return response;
	}
}