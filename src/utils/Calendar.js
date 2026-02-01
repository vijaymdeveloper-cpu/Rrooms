import React, { useState, useMemo } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CalendarModal = ({
  visible,
  title = 'Select Date',
  mode = 'single', // 'single' or 'range'
  dateRange,       // array [start, end] or object {checkinDate, checkoutDate}
  selectedDate,    // object {checkinDate} for single mode
  onChange,        // callback for parent update
  onApply,         // optional, modal hide callback
  onClose,
  minDate,
  maxDate,
  initialDate,
}) => {
  const [tempRange, setTempRange] = useState([null, null]);

  // effectiveRange = tempRange while selecting, fallback to parent props
  const effectiveRange = useMemo(() => {
    if (tempRange[0]) return tempRange;

    if (mode === 'single' && selectedDate?.checkinDate) {
      return [selectedDate.checkinDate, selectedDate.checkinDate];
    }

    if (mode === 'range' && dateRange) {
      if (Array.isArray(dateRange)) return dateRange;
      return [dateRange.checkinDate || null, dateRange.checkoutDate || null];
    }

    return [null, null];
  }, [tempRange, dateRange, selectedDate, mode]);

  const handleDayPress = (day) => {
    const date = day.dateString;

    if (mode === 'single') {
      setTempRange([date, date]); // highlight immediately
      return;
    }

    const [start, end] = effectiveRange;
    let newRange;
    if (!start || (start && end)) {
      newRange = [date, null];
    } else {
      newRange = date < start ? [date, start] : [start, date];
    }
    setTempRange(newRange);
  };

  const getMarkedDates = () => {
    const [start, end] = effectiveRange;
    let marked = {};

    if (mode === 'single' && start) {
      marked[start] = { selected: true, selectedColor: '#28a745', textColor: '#fff' };
      return marked;
    }

    if (mode === 'range' && start) {
      marked[start] = { startingDay: true, color: '#28a745', textColor: '#fff' };
      if (end) marked[end] = { endingDay: true, color: '#28a745', textColor: '#fff' };

      if (start && end) {
        let s = new Date(start);
        let e = new Date(end);
        for (let d = new Date(s.getTime() + 86400000); d < e; d.setDate(d.getDate() + 1)) {
          marked[d.toISOString().split('T')[0]] = { color: '#93c5fd', textColor: '#fff' };
        }
      }
    }

    return marked;
  };

  const isApplyDisabled =
    mode === 'single' ? !effectiveRange[0] : !(effectiveRange[0] && effectiveRange[1]);

  const handleApply = () => {
    if (effectiveRange[0]) {
      if (mode === 'single') {
        onChange?.({ checkinDate: effectiveRange[0] });
      } else {
        if (Array.isArray(dateRange) || !dateRange) {
          onChange?.([effectiveRange[0], effectiveRange[1]]);
        } else {
          onChange?.({
            checkinDate: effectiveRange[0],
            checkoutDate: effectiveRange[1] || null,
          });
        }
      }
    }
    onApply?.();
    onClose?.();
    setTempRange([null, null]); // reset temp
  };

  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={26} />
          </TouchableOpacity>
        </View>

        <Calendar
          current={initialDate}
          minDate={minDate}
          maxDate={maxDate}
          markingType={mode === 'range' ? 'period' : 'simple'}
          markedDates={getMarkedDates()}
          onDayPress={handleDayPress}
          pastScrollRange={12}
          futureScrollRange={12}
          scrollEnabled
          renderArrow={(direction) => (
            <Ionicons name={direction === 'left' ? 'chevron-back' : 'chevron-forward'} size={20} />
          )}
          theme={{ todayTextColor: '#FF6B00' }}
        />

        <TouchableOpacity
          disabled={isApplyDisabled}
          onPress={handleApply}
          style={[styles.applyBtn, isApplyDisabled && { opacity: 0.5 }]}
        >
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', position: 'absolute', bottom: 0, width: '100%', paddingBottom: 20 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' },
  header: { height: 70, paddingHorizontal: 16, borderBottomWidth: 1, borderColor: '#e5e7eb', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '600' },
  applyBtn: { backgroundColor: '#1e90ff', borderRadius: 8, alignItems: 'center', paddingVertical: 14, margin: 16 },
  applyText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
