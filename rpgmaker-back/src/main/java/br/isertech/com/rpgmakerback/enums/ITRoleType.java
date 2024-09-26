package br.isertech.com.rpgmakerback.enums;

import java.util.HashMap;
import java.util.Map;

public enum ITRoleType {

    ROLE_ADMIN("ROLE_ADMIN"),
    ROLE_USER("ROLE_USER");

    ITRoleType(String label) {
        this.label = label;
    }

    private final String label;
    private static final Map<String, ITRoleType> BY_LABEL = new HashMap<>();

    static {
        for (ITRoleType r : values()) {
            BY_LABEL.put(r.label, r);
        }
    }

    public static ITRoleType valueOfLabel(String label) {
        return BY_LABEL.get(label);
    }
}