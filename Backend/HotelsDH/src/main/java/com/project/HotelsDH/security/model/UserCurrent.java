package com.project.HotelsDH.security.model;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/** puede usarse como anotacion interna dentro de spring*/
/** @UserCurrent se pueda usar en un parametro o dentro de otras anotaciones*/
@Target({ ElementType.PARAMETER, ElementType.ANNOTATION_TYPE })
@Retention(RetentionPolicy.RUNTIME) /** anotacion disponible en tiempo de ejecución*/
@AuthenticationPrincipal /** Brinda datos del usuario que envio la petición*/
public @interface UserCurrent {
}