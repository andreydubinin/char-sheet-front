import { required, confirmed, length, email, min, regex } from "vee-validate/dist/rules";
import ru from "vee-validate/dist/locale/ru.json";
import { extend, localize } from "vee-validate";

extend("required", required);

extend("email", email);

extend("confirmed", confirmed);

extend("length", length);

extend("min", min);

extend("regex", regex);

ru.messages.confirmed = 'Поле {_field_} не совпадает с полем Подтверждение пароля'

localize('ru', ru)
