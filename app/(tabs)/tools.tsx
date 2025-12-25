import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import {
    Alert,
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
  reminder?: boolean;
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

export default function ToolsScreen() {
  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "todos">(
    "overview"
  );
  const [notes, setNotes] = useState<Note[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState<"low" | "medium" | "high">(
    "medium"
  );
  const [modalType, setModalType] = useState<"note" | "todo">("note");

  const tools: Tool[] = [
    {
      id: "notes",
      name: "Notes",
      description: "Create and manage your notes",
      icon: "document-text-outline",
    },
    {
      id: "todos",
      name: "Todo Lists",
      description: "Track tasks with smart reminders",
      icon: "checkbox-outline",
    },
  ];

  const addNote = useCallback(() => {
    if (!newNoteTitle.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }
    const newNote: Note = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: newNoteContent,
      createdAt: new Date(),
    };
    setNotes([newNote, ...notes]);
    setNewNoteTitle("");
    setNewNoteContent("");
    setModalVisible(false);
  }, [newNoteTitle, newNoteContent, notes]);

  const addTodo = useCallback(() => {
    if (!newTodoTitle.trim()) {
      Alert.alert("Error", "Please enter a todo title");
      return;
    }
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: newTodoTitle,
      completed: false,
      priority: newTodoPriority,
      reminder: newTodoPriority === "high",
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
    setNewTodoTitle("");
    setNewTodoPriority("medium");
    setModalVisible(false);
  }, [newTodoTitle, newTodoPriority, todos]);

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const getFilteredTodos = () => {
    return todos.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  const renderOverview = () => (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.sectionTitle}>Available Tools</Text>
      {tools.map((tool) => (
        <TouchableOpacity
          key={tool.id}
          style={styles.toolCard}
          onPress={() =>
            setActiveTab(tool.id === "notes" ? "notes" : "todos")
          }
        >
          <Ionicons name={tool.icon as any} size={40} color="#007AFF" />
          <View style={styles.toolTextContainer}>
            <Text style={styles.toolName}>{tool.name}</Text>
            <Text style={styles.toolDescription}>{tool.description}</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="#999" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderNotes = () => (
    <View style={styles.container}>
      <View style={styles.notesHeader}>
        <Text style={styles.notesCount}>
          {notes.length} {notes.length === 1 ? "Note" : "Notes"}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setModalType("note");
            setModalVisible(true);
          }}
        >
          <Ionicons name="add-circle-outline" size={32} color="#007AFF" />
        </TouchableOpacity>
      </View>
      {notes.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons
            name="document-text-outline"
            size={60}
            color="#ccc"
          />
          <Text style={styles.emptyText}>No notes yet</Text>
          <Text style={styles.emptySubtext}>
            Create your first note to get started
          </Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.noteCard}>
              <View style={styles.noteHeader}>
                <Text style={styles.noteTitle}>{item.title}</Text>
                <TouchableOpacity onPress={() => deleteNote(item.id)}>
                  <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>
              <Text style={styles.noteContent} numberOfLines={2}>
                {item.content}
              </Text>
              <Text style={styles.noteDate}>
                {item.createdAt.toLocaleDateString()}
              </Text>
            </View>
          )}
          scrollEnabled={false}
        />
      )}
    </View>
  );

  const renderTodos = () => {
    const filteredTodos = getFilteredTodos();
    return (
      <View style={styles.container}>
        <View style={styles.todosHeader}>
          <Text style={styles.todosCount}>
            {filteredTodos.filter((t) => !t.completed).length} Active
          </Text>
          <TouchableOpacity
            onPress={() => {
              setModalType("todo");
              setModalVisible(true);
            }}
          >
            <Ionicons name="add-circle-outline" size={32} color="#007AFF" />
          </TouchableOpacity>
        </View>
        {filteredTodos.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="checkbox-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No todos yet</Text>
            <Text style={styles.emptySubtext}>
              Create a task to get started
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredTodos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.todoCard,
                  item.completed && styles.todoCardCompleted,
                  item.priority === "high" && styles.todoCardHigh,
                ]}
              >
                <TouchableOpacity
                  onPress={() => toggleTodo(item.id)}
                  style={styles.todoCheckbox}
                >
                  <Ionicons
                    name={
                      item.completed
                        ? "checkbox"
                        : "checkbox-outline"
                    }
                    size={24}
                    color={item.completed ? "#34C759" : "#999"}
                  />
                </TouchableOpacity>
                <View style={styles.todoContent}>
                  <Text
                    style={[
                      styles.todoTitle,
                      item.completed && styles.todoTitleCompleted,
                    ]}
                  >
                    {item.title}
                  </Text>
                  <View style={styles.todoMeta}>
                    <View
                      style={[
                        styles.priorityBadge,
                        item.priority === "high" &&
                          styles.priorityBadgeHigh,
                        item.priority === "medium" &&
                          styles.priorityBadgeMedium,
                      ]}
                    >
                      <Text style={styles.priorityText}>
                        {item.priority}
                      </Text>
                    </View>
                    {item.reminder && (
                      <Ionicons
                        name="notifications-outline"
                        size={14}
                        color="#FF9500"
                      />
                    )}
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => deleteTodo(item.id)}
                  style={styles.todoDelete}
                >
                  <Ionicons name="close-outline" size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            )}
            scrollEnabled={false}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === "overview" && styles.tabItemActive,
          ]}
          onPress={() => setActiveTab("overview")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "overview" && styles.tabTextActive,
            ]}
          >
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === "notes" && styles.tabItemActive,
          ]}
          onPress={() => setActiveTab("notes")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "notes" && styles.tabTextActive,
            ]}
          >
            Notes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === "todos" && styles.tabItemActive,
          ]}
          onPress={() => setActiveTab("todos")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "todos" && styles.tabTextActive,
            ]}
          >
            Todos
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "overview" && renderOverview()}
      {activeTab === "notes" && renderNotes()}
      {activeTab === "todos" && renderTodos()}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {modalType === "note" ? "New Note" : "New Todo"}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
              >
                <Ionicons
                  name="close-outline"
                  size={28}
                  color="#333"
                />
              </TouchableOpacity>
            </View>

            {modalType === "note" ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Note title"
                  value={newNoteTitle}
                  onChangeText={setNewNoteTitle}
                  placeholderTextColor="#999"
                />
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Note content"
                  value={newNoteContent}
                  onChangeText={setNewNoteContent}
                  multiline
                  numberOfLines={6}
                  placeholderTextColor="#999"
                  textAlignVertical="top"
                />
              </>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Todo title"
                  value={newTodoTitle}
                  onChangeText={setNewTodoTitle}
                  placeholderTextColor="#999"
                />
                <View style={styles.prioritySelector}>
                  <Text style={styles.priorityLabel}>Priority:</Text>
                  <View style={styles.priorityButtons}>
                    {(["low", "medium", "high"] as const).map(
                      (priority) => (
                        <TouchableOpacity
                          key={priority}
                          style={[
                            styles.priorityButton,
                            newTodoPriority === priority &&
                              styles.priorityButtonActive,
                          ]}
                          onPress={() =>
                            setNewTodoPriority(priority)
                          }
                        >
                          <Text
                            style={[
                              styles.priorityButtonText,
                              newTodoPriority === priority &&
                                styles.priorityButtonTextActive,
                            ]}
                          >
                            {priority}
                          </Text>
                        </TouchableOpacity>
                      )
                    )}
                  </View>
                </View>
              </>
            )}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={
                modalType === "note" ? addNote : addTodo
              }
            >
              <Text style={styles.submitButtonText}>
                {modalType === "note"
                  ? "Save Note"
                  : "Create Todo"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    padding: 16,
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
  },
  tabText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#007AFF",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  toolCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  toolTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  toolName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  toolDescription: {
    fontSize: 14,
    color: "#999",
  },
  notesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  todosHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  notesCount: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  todosCount: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  noteCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  noteContent: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 12,
    color: "#999",
  },
  todoCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#FFB800",
  },
  todoCardCompleted: {
    backgroundColor: "#f9f9f9",
  },
  todoCardHigh: {
    borderLeftColor: "#FF3B30",
  },
  todoCheckbox: {
    marginRight: 12,
  },
  todoContent: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 6,
  },
  todoTitleCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  todoMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  priorityBadge: {
    backgroundColor: "#E8E8E8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityBadgeHigh: {
    backgroundColor: "#FFE8E8",
  },
  priorityBadgeMedium: {
    backgroundColor: "#FFF3E0",
  },
  priorityText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  todoDelete: {
    marginLeft: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 32,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    minHeight: 100,
    paddingTop: 10,
  },
  prioritySelector: {
    marginBottom: 16,
  },
  priorityLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  priorityButtons: {
    flexDirection: "row",
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    alignItems: "center",
  },
  priorityButtonActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    textTransform: "capitalize",
  },
  priorityButtonTextActive: {
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
